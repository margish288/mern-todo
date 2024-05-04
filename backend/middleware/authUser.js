import jwt from "jsonwebtoken";

export const authUser = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response
      .status(401)
      .json({ message: "Unauthorized access, Please Login !" });
  }

  const token = authorization.split(" ")[1];
  // console.log("TOKEN: ", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("DECODED TOKEN: ", decoded);
    request.user = decoded;
    request.token = token;
    next();
  } catch (error) {
    console.log("Error while verifying token: ", error);
    return response.status(401).json({ message: "Unauthorized access" });
  }
};
