// import { Button } from 'flowbite-react';
// import { AiFillGoogleCircle } from 'react-icons/ai';
// import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
// import { app } from '../../firebase';
// import { useDispatch } from 'react-redux';
// import { signInSuccess } from '../../redux/user/userSlice';
// import { useNavigate } from 'react-router-dom';

// export default function OAuth() {
//     const auth = getAuth(app)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const handleGoogleClick = async () =>{
//         const provider = new GoogleAuthProvider()
//         provider.setCustomParameters({ prompt: 'select_account' })
//         try {
//             const resultsFromGoogle = await signInWithPopup(auth, provider)
//             const res = await fetch('/api/auth/google', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     name: resultsFromGoogle.user.displayName,
//                     email: resultsFromGoogle.user.email,
//                     googlePhotoUrl: resultsFromGoogle.user.photoURL,
//                 }),
//                 })
//             const data = await res.json()
//             if (res.ok){
//                 dispatch(signInSuccess(data))
//                 navigate('/')
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     } 
//   return (
//     <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
//         <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
//         Continue with Google
//     </Button>
//   )
// }
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            // Log the authentication results to inspect its structure
            console.log('Results from Google:', resultsFromGoogle);

            // Send user data to server for authentication
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            });

            // Handle response from the server
            if (res.ok) {
                const data = await res.json();
                dispatch(signInSuccess(data));
                navigate('/');
            } else {
                // If server response is not OK, dispatch sign-in failure action
                dispatch(signInFailure('Failed to sign in with Google.'));
            }
        } catch (error) {
            // Handle Firebase authentication errors
            console.error('Error signing in with Google:', error);
            dispatch(signInFailure('Failed to sign in with Google.'));
        }
    };

    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
            Continue with Google
        </Button>
    );
}
