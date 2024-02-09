export default function InputSpan({ wrapper = "span", classs,onEdit, children }) {
    let Wrapper;
    if(wrapper==='span'){
        Wrapper=(<span className={classs}>{children}</span>)
    }
    else{
        Wrapper=(<input type="text" className={classs} value={children} onChange={onEdit}></input>)
    }
    return (
        Wrapper
    );
}
