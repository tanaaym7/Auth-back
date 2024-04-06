const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const extraDetail = err.errors[0].message;
    const error = {
      status: 422,
      extraDetail,
    };
    next(error);
  }
};

module.exports = validate;
