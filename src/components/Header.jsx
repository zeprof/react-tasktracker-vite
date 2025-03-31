import Button from "./Button.jsx";

const Header = ({title}) => {
    return (
        <header>
            <h1>{title}</h1>
            <Button/>
        </header>
    )
}

export default Header
