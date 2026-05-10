import { GoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../../store/useAuthStore';

export default function GoogleLoginButton() {
    const { loginWithGoogle } = useAuthStore();

    return (
        <div className="w-full flex justify-center p-4">
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    loginWithGoogle(credentialResponse.credential);
                }}
                onError={() => {
                    console.error('Помилка входу через Google');
                }}
            />
        </div>
    );
}