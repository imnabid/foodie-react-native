import { User } from "./schema";

const JWT_SECRET = "fskdbf374h2jn{}jdiw()sdhsfhjsb??djskjdsk1212nkdfkdn[]nskdksn[}nfdhjdks231"
const loggedIn = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token', token)
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    token = token.split(' ')[1];
    const decodedToken = await util.promisify(jwt.verify)(token, JWT_SECRET)

    const user = await User.findOne({ email: decodedToken.email });
    console.log(user.email)

    if (!user) {
        return res.status(404).send("User not found");
    }

    req.user = user;
    next();
    next();
}

const isAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}