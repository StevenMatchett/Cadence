const Cadence = () => {
    const [cadence, setCadence] = React.useState(0);
    React.useEffect(()=>{
        setInterval(async ()=>{
            let value = await fetch('http://localhost:3000/status');
            value = await value.json();
            console.log(value)
            setCadence(value.cadence)
        },1000)
    },[])
    

  
    return <div style={{
            color:"green", 
            'font-size': "500px", 
            display:"flex", 
            "justify-content": "center",
            "align-items": "center",
            "text-align": "center",
            "min-height": "100vh",
        }}>{cadence}</div>

}
const domContainer = document.querySelector('#root'); 
ReactDOM.render(<Cadence/>, domContainer);