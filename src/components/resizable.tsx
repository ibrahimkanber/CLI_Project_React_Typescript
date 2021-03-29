import { ResizableBox ,ResizableBoxProps} from "react-resizable"
import {useEffect,useState} from "react"
import "./resizable.css"
interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    const [innerHeight, setİnnerHeight] = useState(window.innerHeight)
    const [innerWidth, setİnnerWidth] = useState(window.innerWidth)
    const [width,setWidth]=useState(window.innerWidth*0.75)
    let resizableProps:ResizableBoxProps;

    if(direction==="horizontal"){
        resizableProps={
            className:'resize-horizontal',
            height:Infinity ,
            width:width,
            resizeHandles:['e'],
            maxConstraints:[innerWidth*0.75,Infinity],
            minConstraints:[innerWidth*0.2,Infinity],
            onResizeStop:(e,data)=>{
                setWidth(data.size.width)
            }
        }

    }else{
        resizableProps={
            height:300 ,
            width:Infinity,
            resizeHandles:['s'],
            maxConstraints:[Infinity,innerHeight*0.9],
            minConstraints:[Infinity,24]
        }
    }

    useEffect(() => {
       let timer:any;

       if(timer){
           clearTimeout(timer)
       }
        const listener=()=>{
           timer= setTimeout(()=>{
                setİnnerHeight(window.innerHeight)
                setİnnerWidth(window.innerWidth)
                if(window.innerWidth*0.75<width){
                    setWidth(window.innerWidth*0.75)
                }
            },500)
           
        }

        window.addEventListener("resize",listener)

        return ()=>{
            window.removeEventListener("resize",listener)
        }
    }, [width])
    return (
        <ResizableBox 
        {...resizableProps}
        >
            {children}
        </ResizableBox>
    )


}

export default Resizable