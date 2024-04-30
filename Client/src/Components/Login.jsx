function Login(){
    return(
        <div>
            {/* <h1>Login</h1>
            <input className="border-2 border-black-600" type="text" placeholder="Enter your email address"/><br />
            <input className="border-2 border-black-600" type="password" placeholder="Enter Password"/><br /> */}
            <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                    <h2>Login with</h2>
                </div>
                <div className="flex-auto p-6">
                    <form role="form text-left">
                        <div className="mb-4">
                            <input 
                                aria-describedby="email-addon" 
                                aria-label="Email" 
                                placeholder="Email"
                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" 
                                type="email"
                            />
                        </div>
                        <div className="mb-4">
                            <input 
                                aria-describedby="password-addon" 
                                aria-label="Password" 
                                placeholder="Password" 
                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" 
                                type="password"
                            />
                        </div>
                        <div className="text-center">
                            <button className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white" type="button">Log in</button>
                        </div>
                        <p className="mt-4 mb-0 leading-normal text-sm">Dont have an account? <a className="font-bold text-slate-700" href="./signup">Sign up</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;