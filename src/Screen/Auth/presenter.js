import {GoogleSignin} from "react-native-google-signin";
import FCM from "react-native-fcm";
import {actLogin, actLoginFacebook} from "./action";
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import md5 from "crypto-js/md5";

export async function signIn() {
    try {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const user = await GoogleSignin.signIn();
        console.log(user)
    } catch (error) {
        if (error.code === 'CANCELED') {
        } else {
        }
        console.log("===>", error)
    }
}

export async function _getCurrentUser() {
    try {
        const user = await GoogleSignin.currentUserAsync();
        this.setState({user, error: null});
    } catch (error) {
        this.setState({
            error,
        });
    }
};

export async function _configureGoogleSignIn() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        iosClientId: '', // only for iOS
        webClientId: 'AIzaSyBziBj2umJ0GQqVnZlk0kaKm2OsbwbuYGY', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
        accountName: '', // [Android] specifies an account name on the device that should be used
    }).then((re) => {
        console.log(re)
    });
};

export function onRegisterClick(props) {
    return () => {
        props.navigation.navigate('Register')
    }
};

export const onForgotClick = (props) => {
    return () => {
        props.navigation.navigate('ForgetPassword')
    }
};

export const onLoginFacebookClick = (props) => {
    let token = "";
    FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));
    FCM.getFCMToken().then(token_ => {
        token = token_;
    })
    return () => {

        FBLoginManager.loginWithPermissions(["email"], (error, data) => {
            if (!error) {
                let profil = JSON.parse(data.profile)
                let data_ = {
                    name: profil.name,
                    photo: "https://graph.facebook.com/" + profil.id + "/picture?type=large"
                }
                let params = {
                    par_user_email: profil.email,
                    par_user_name: profil.name,
                    par_user_id: profil.id,
                    par_token: token,
                    par_user_photo: profil.picture.data.url
                }
                props.dispatch(actLoginFacebook(params, data_));

            } else {
                console.log("Error: ", error);
            }
        })
    }
};
