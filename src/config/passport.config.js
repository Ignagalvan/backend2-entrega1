import passport from "passport";
import jwtStrategy from "passport-jwt";

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJwt = jwtStrategy.ExtractJwt;

const cookieExtractor = req => {

    let token = null;

    if (req && req.cookies) {
        token = req.cookies["coderCookieToken"];
    }

    return token;
};

const initializePassport = () => {

    passport.use("jwt", new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.JWT_SECRET
        },

        async (jwt_payload, done) => {

            try {

                return done(null, jwt_payload);

            } catch (error) {

                return done(error);

            }

        }

    ));

};

export default initializePassport;