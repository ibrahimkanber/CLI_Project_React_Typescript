import * as esbuild from "esbuild-wasm"
import ReactDOM from "react-dom"
import { useEffect, useState, useRef } from "react"
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin"
import { fetchPlugin } from "./plugins/fetch-plugin"

const App = () => {
    const ref = useRef<any>()
    const [input, setInput] = useState("")
    const [code, setCode] = useState("")

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
        const result = await ref.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(),fetchPlugin(input)],
            define:{
                'process.env.NODE_ENV':' "production" ',
                global:"window"
            }
        })

        console.log(result)
        setCode(result.outputFiles[0].text)

    }

    useEffect(() => {
        startService()
    }, [])


    return <div>
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>
                Submit
            </button>
            <pre>{code}</pre>
        </div>
    </div>
}

ReactDOM.render(<App />, document.querySelector("#root"))