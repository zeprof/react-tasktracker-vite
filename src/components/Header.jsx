import Button from "./Button.jsx";

const Header = ({title}) => {
    const onClick = () => {
        console.log('Click')
    }
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color='green' text='Hello' onClick={onClick}/>
        </header>
    )
}
export default Header
