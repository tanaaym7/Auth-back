const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email cannot be blank" })
    .trim()
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password cannot be blank" })
    .min(6, { message: "Password must be at least 7 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" })
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@!$%*#?&]{6,20}$/.test(
          password
        ),
      "Password should include: atleast 7 characters, a capital letter, a number, a symbol"
    ),
});

const signupSchema = loginSchema.extend({
  name: z
    .string({ required_error: "Name cannot be blank" })
    .trim()
    .refine(
      (name) => name.length > 2 && name.length < 20,
      "Name must be at least 3 characters"
    ),
});

module.exports = { signupSchema, loginSchema };
