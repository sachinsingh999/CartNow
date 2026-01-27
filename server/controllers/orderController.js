import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'


//globe variable
const currency='inr';
const deliveryCharge=10
//getway Initialization
// const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)


/* ================= PLACE ORDER ================= */
const placeOrder = async (req, res) => {
  try {
    console.log("REQ.USER 👉", req.user); // 🔍 MUST SHOW _id
    console.log("REQ BODY 👉", req.body);

    const { items, amount, address, paymentMethod } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const order = await orderModel.create({
      userId: req.user._id,      // 🔥 FIX 1
      items: items,              // 🔥 FIX 2
      amount,
      address,
      paymentMethod:'COD',
      paymentStatus: "pending",
      orderStatus: "placed",
      date: Date.now(),
    });

    // optional: clear cart after order
    await userModel.findByIdAndUpdate(req.user._id, {
      cartData: {},
    });

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("ORDER ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= STRIPE PLACE ORDER ================= */
const placeOrderStripe = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe secret key missing");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { items, amount, address } = req.body;
    const { origin } = req.headers;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const order = await orderModel.create({
      userId: req.user._id,
      items,
      amount,
      address,
      paymentMethod: "stripe",
      paymentStatus: "pending",
      orderStatus: "placed",
      date: Date.now(),
    });

    const line_items = items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 10 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("STRIPE ERROR 👉", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//verify stripe
const verifyStripe = async (req, res) => {
  try {
    const { success, orderId } = req.query;

    if (!orderId) {
      return res.json({ success: false, message: "Order ID missing" });
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        paymentStatus: "paid",
      });

      return res.json({ success: true });
    } else {
      await orderModel.findByIdAndUpdate(orderId, {
        paymentStatus: "failed",
      });

      return res.json({ success: false });
    }
  } catch (error) {
    console.log("VERIFY ERROR 👉", error);
    res.json({ success: false, message: error.message });
  }
};



/* ================= RAZORPAY (PLACEHOLDER) ================= */
const placeOrderRazorpay = async (req, res) => {
  try {
    res.json({ success: true, message: "Razorpay order placeholder" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= ADMIN: ALL ORDERS ================= */
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= USER: MY ORDERS ================= */
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.user._id }) // 🔥 FIX 3
      .sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= ADMIN: UPDATE STATUS ================= */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      orderStatus: status,
    });

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
