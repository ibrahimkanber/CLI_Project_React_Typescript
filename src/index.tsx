import 'bulmaswatch/superhero/bulmaswatch.min.css'
import * as esbuild from "esbuild-wasm"
import ReactDOM from "react-dom"
import { useEffect, useState, useRef } from "react"
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin"
import { fetchPlugin } from "./plugins/fetch-plugin"
import CodeEditor from "./components/code-editor"

const App = () => {
    const ref = useRef<any>()
    const iframe = useRef<any>()
    const [input, setInput] = useState("")


    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "http://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
        })

    }


    const onClick = async () => {
        //console.log(input)
        if (!ref.current) {
            return
        }
        /*     const result=await ref.current.transform(input,{
                loader:'jsx',
                target:'es2015'
            }) */

        iframe.current.srcdoc = html

        const result = await ref.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)],
            define: {
                'process.env.NODE_ENV': ' "production" ',
                global: "window"
            }
        })

        iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*")
        //console.log(result)
        //setCode(result.outputFiles[0].text)
        /*      try {
                 eval(result.outputFiles[0].text);
     
             } catch (error) {
                 alert(error)
             } */
    }

    useEffect(() => {
        startService()
    }, [])


    const html = `
    
    <html>
    <head></head>
    <body>
        <div id="root"></div>
        <script>
        window.addEventListener("message",(event)=>{
            try{
                eval(event.data)
            }catch(err){
                const root=document.querySelector("#root");
                root.innerHTML='<div style="color:red"><h4>Runtime Error</h4>'+err+'</div>'
                throw err
            }
        

        },false)
        </script>
    </body>
    
    </html>
    `
    return (
        <div>
            <CodeEditor 
            initialValue="const a=1;"
            onChange={val=>setInput(val)}
            
            />
            <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
            <div>
                <div>
                    <button onClick={onClick}>
                        Submit
            </button>
                </div>

                <iframe sandbox="allow-scripts" srcDoc={html} ref={iframe} title="code preview" />
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector("#root"))