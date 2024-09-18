// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user = ref(null);

export default function useAuthUser() {
  const supabase = useSupabaseClient()

  /**
   * Login with email and password
   */
  const login = async ({ email, password }: { email: string, password: string }) => {
    const { data: user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return user;
  };

  /**
   * Log in a user using magiclink or a one-time password (OTP)
   * If the {{ .ConfirmationURL }} variable is specified in the email template, a magiclink will be sent. 
   * If the {{ .Token }} variable is specified in the email template, an OTP will be sent.
   */
  const loginWithMagicEmail = async (email: string) => {
    const { data: user, error } = await supabase.auth.signInWithOtp({ email })
    if (error) throw error;
    return user;
  };

  /**
   * Login with google, facebook, etc
   */
  const loginWithSocialProvider = async (provider: any) => {
    const { data: user, error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw error;
    return user;
  };

  /**
   * Logout
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    const user = useSupabaseUser()
    return !!user.value;
  };

  /**
   * Register
   */
  const register = async ({ email, password }:{email: string, password: string}) => {
    const { data: user, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error;
    return user;
  };

  /**
   * Update user email, password, or meta data
   */
  const update = async (data: any) => {
    const { data: user, error } = await supabase.auth.updateUser(data);
    if (error) throw error;
    return user;
  };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordRestEmail = async (email: string) => {
    const { data: user, error } = await supabase.auth.resetPasswordForEmail(
      email
    );
    if (error) throw error;
    return user;
  };

  /**
   * TODO:
   * Will be useful for informing the application what to do
   * when Supabase redirects a user back to app
   * after confirming email address
   */
  // const maybeHandleEmailConfirmation = async (route) => {};

  return {
    user,
    login,
    loginWithSocialProvider,
    loginWithMagicEmail,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordRestEmail,
    // maybeHandleEmailConfirmation,
  };
}
