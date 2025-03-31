
const Header = ({title}) => {
    return (
        <header>
            <h1 style={headingStyle}>{title}</h1>
        </header>
    )
}

const headingStyle = {
    color: 'red', backgroundColor: 'black'
}
export default Header
