import { Link } from "react-router-dom"
import pageNotFoundImageLight from "../imgs/404-light.png"
import pageNotFoundImageDark from "../imgs/404-dark.png"
import darkLogo from "../imgs/logo-light.png";
import lightLogo from "../imgs/logo-dark.png";
import { useContext } from "react";
import { ThemeContext } from "../App";


const PageNotFound = () => {

    let { theme } = useContext(ThemeContext);
    return (
        <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">

            <img src={ theme == "light" ? pageNotFoundImageDark : pageNotFoundImageLight} className="select-none border-grey w-72 aspect-square object-cover rounded" />
            <h1 className="text-4xl font-gelasio leading-7" >Page Not Found</h1>
            <p className="text-dark-grey text-xl leading-7 -mt-8">The Page you are looking for does not exists. Head back to the <Link to="/" className="text-black underline">Home Page</Link></p>

            <div className="mt-auto">
                <img src={ theme == "light" ? darkLogo : lightLogo} className="h-16 object-contain block mx-auto select-none" />
                <p className="text-black text-2xl font-bold">ReadingSome</p>
                <p className="mt-5 text-dark-grey">Read Millions of Stories around the World</p>
            </div>
        </section>
    )
}

export default PageNotFound