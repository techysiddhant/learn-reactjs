import { useAuth0 } from "@auth0/auth0-react";
import google from "../../assets/google.png";
const Login = () => {
	const { loginWithRedirect, loginWithPopup } = useAuth0();
	return (
		<div className=" flex items-center justify-center h-[calc(100vh-112px)]">
			<div className="flex items-center justify-center flex-col ">
				<button
					onClick={() => loginWithPopup()}
					className="flex items-center justify-center bg-[#C95252] px-10 my-8 py-2 rounded-md font-bold text-white"
				>
					{" "}
					<span className="pr-4">
						<img
							src={google}
							alt=""
						/>
					</span>{" "}
					Login with google
				</button>
				<div className="flex items-center w-[250px] gap-6 mx-8">
					<span className="bg-white h-[1px] text-white w-full"></span>
					<span className="text-white text-[20px]">OR</span>
					<span className="bg-white h-[1px] text-white w-full"></span>
				</div>
				<form
					action=""
					className=""
				>
					<div className="flex flex-col w-full gap-8 my-8">
						<input
							type="text"
							placeholder="Username"
							className="text-center text-xl border-none outline-none py-2 rounded-md"
						/>

						<input
							type="password"
							placeholder="Password"
							className="text-center text-xl border-none outline-none py-2 rounded-md"
						/>
					</div>
					<button
						type="submit"
						className="btn py-3 px-4 text-lg rounded-xl block mx-auto font-bold"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
