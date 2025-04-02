import Button from "./Button.jsx";

const Header = ({title}) => {
    return (
        <header>
            <h1>{title}</h1>
            <Button color='green' text='Hello'/>
            <Button color='red' text='Allo'/>
            <Button color='blue' text='React'/>
            <Button color='yellow' text='Bincoudon'/>
        </header>
    )
}

export default Header
