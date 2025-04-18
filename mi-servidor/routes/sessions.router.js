import jwt from "jsonwebtoken";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password) return res.status(401).send("Credenciales incorrectas");

  const token = jwt.sign({
    email: user.email,
    role: user.role,
    cartId: user.cart
  }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});
