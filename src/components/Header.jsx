import Button from "./Button.jsx";

const Header = ({title}) => {
    return (
        <header>
            <h1>{title}</h1>
            <Button color='green' text='Hello'/>
        </header>
    )
}

export default Header
