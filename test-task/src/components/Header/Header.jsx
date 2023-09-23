import logo from "../../assets/logo.png";
const Header = () => {
	return (
		<nav className="px-8 py-8 flex justify-between">
			<div className="flex items-center gap-5">
				<div>
					<img
						src={logo}
						alt="filter-pixel-logo"
					/>
				</div>
				<span className="text-2xl text-white font-medium">FilterPixel</span>
			</div>
			<div>
				<button className="px-4 bg-white text-black font-semibold font-xl py-2 rounded-xl">
					Sign Up
				</button>
			</div>
		</nav>
	);
};

export default Header;
