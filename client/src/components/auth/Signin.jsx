import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../../reduce/api/authApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const Signin = () => {
  const navigate = useNavigate()
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [login, {isLoading, error, data}]=useLoginMutation()
    const {isAuthenticated} = useSelector((state)=> state.auth)
    useEffect(()=>{
        if (isAuthenticated) {
            navigate("/")
        }
        if (error) {
            toast.error(error?.data?.message);
          }
    },[error, isAuthenticated])
    const submitHandler = (e)=>{
        e.preventDefault()

        const loginData = {
            email,
            password
        }
        login(loginData)
    }
  return (
    // <div className="font-[sans-serif]">
    // <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
    //   <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
    //     <div>
    //       <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
    //         Seamless Login for Exclusive Access
    //       </h2>
    //       <p className="text-sm mt-6 text-gray-800">Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.</p>
    //       <p className="text-sm mt-12 text-gray-800">Don't have an account <Link to="/signup" className="text-blue-600 font-semibold hover:underline ml-1">Register here</Link></p>
    //     </div>

    //     <form className="max-w-md md:ml-auto w-full">
    //       <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
    //         Sign in
    //       </h3>

    //       <div className="space-y-4">
    //         <div>
    //           <input name="email" type="email" autoComplete="email" required className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent" placeholder="Email address" />
    //         </div>
    //         <div>
    //           <input name="password" type="password" autoComplete="current-password" required className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent" placeholder="Password" />
    //         </div>
    //         <div className="flex flex-wrap items-center justify-between gap-4">
    //           <div className="flex items-center">
    //             <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
    //             <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
    //               Remember me
    //             </label>
    //           </div>
    //           <div className="text-sm">
    //             <a href="jajvascript:void(0);" className="text-blue-600 hover:text-blue-500 font-semibold">
    //               Forgot your password?
    //             </a>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="!mt-8">
    //         <button type="button" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
    //           Log in
    //         </button>
    //       </div>

    <div className="bg-gray-100 flex h-screen items-center justify-center p-4">
    <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-md p-8">

            <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
            </h2>


            <form className="space-y-6 mt-4"  onSubmit={submitHandler}>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                        <input name="email" type="email-address" autoComplete="email-address" required
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1">
                        <input id="password" name="password" type="password" autoComplete="password" required
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                </div>
                <div>
                    <Link to="/password/forgot">Forgot password</Link>
                </div>

                <div>
                    <button type="submit"
                        className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                            {isLoading ? "Authenticating..." : "Log In"}
                          
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
                      Don't have an account? <Link to="/signup" className=" font-semibold text-primary-600 hover:underline dark:text-primary-500 ">Register here</Link>
                  </p>
                </div>
            </form>
        </div>
    </div>
</div>
    
  )
}

export default Signin