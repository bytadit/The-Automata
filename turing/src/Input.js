import React, { Component } from 'react'

class Input extends Component{
    state = {
        first: null,
        second: null,
        delimiter: null,
        tape: [],
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleClick = (tape, delim) =>{
        this.setState({
            delimiter : delim,
            tape : tape
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.inputCatcher(this.state)
    }

    tapeMaker = (props) =>{
        const variable = this.props.variable;
        var tape= [];
        var limit = parseInt(variable.first) + parseInt(variable.second) + 1;
        for (var i =0;i<limit;i++){
            i < variable.first ? tape.push(0) : (i === parseInt(variable.first)) ? tape.push(1) :   tape.push(0) 
        }
        
        if(variable.delimiter === "+" || variable.delimiter === "-" ){
            tape.unshift('B')
            tape.push('B')
        }else if(variable.delimiter === "x" || variable.delimiter === "/" || variable.delimiter === "%" ||variable.delimiter === "exp" ){
            tape.unshift('B')
            tape.push(1, 'B')
        }else if(variable.delimiter === "log"){
            tape.unshift('B', 1)
            tape.push(1, 'B')
        }else if(variable.delimiter === "!"){
            tape.unshift('B',1)
            tape.push('B')
        }
        
        const print = variable.list.map((val) => {
            return(
                <div className="box">{val}</div>   
            )
        })
        return(
            <div>
                <h4 class="mt-2">Operasi</h4>
                <div className="btn-group mb-1" role="group" >
                    <input className='btn bttn' type="submit" id="delimiter" value="+" onClick={() => this.handleClick(tape, '+')}/>
                    <input className='btn bttn' type="submit" id="delimiter" value="-" onClick={() => this.handleClick(tape, '-')}/>
                    <input className='btn bttn' type="submit" id="delimiter" value="/" onClick={() => this.handleClick(tape, '/')}/>
                    <input className='btn bttn' type="submit" id="delimiter" value="x" onClick={() => this.handleClick(tape, 'x')}/>

                    {/* <input className='btn bttn' type="submit" id="delimiter" value="%" onClick={() => this.handleClick(tape, '%')}/> */}

                    <input className='btn bttn' type="submit" id="delimiter" value="log" onClick={() => this.handleClick(tape, 'log')}/>
                    <input className='btn bttn' type="submit" id="delimiter" value="exp" onClick={() => this.handleClick(tape, 'exp')}/>
                    <input className='btn bttn' type="submit" id="delimiter" value="!" onClick={() => this.handleClick(tape, '!')}/>
                </div>
                <h4 class="my-3">User Input Translate</h4>
                <div className="scroll-container" >
                    
                    {variable.blank}
                    {print}
                    {variable.blank}
                </div>
            </div>
        )
    }

    render(){
        let satu; let dua;
        let opr = this.props.variable.delimiter
        console.log(opr)
         == null ?  satu = <span className="input-group-text no-right input-size" id="Input 1">Input 1</span> :
            opr === 'exp' ? satu = <span className="input-group-text no-right lebar input-size" id="Input 1">Pangkat</span> :  
                opr === '!' ? satu = <span className="input-group-text no-right lebar input-size" id="Input 1">Input</span> :
                    opr === 'log' ? satu = <span className="input-group-text no-right lebar input-size" id="Input 1">Numerus</span> :
                        satu = <span className="input-group-text no-right input-size" id="Input 1">Input 1</span>
        
        opr == null ?  dua = <span className="input-group-text no-right input-size" id="Input 1">Input 2</span> :
            opr === 'exp' ? dua = <span className="input-group-text no-right lebar input-size" id="Input 1">Basis</span> : 
                opr === '!' ? dua = <span className="input-group-text no-right lebar input-size" id="Input 1">Isi dgn 0</span> :
                    opr === 'log' ? dua = <span className="input-group-text no-right lebar input-size" id="Input 1">Basis</span> :
                        dua = <span className="input-group-text no-right input-size" id="Input 1">Input 2</span>
        return(
            <div>
                <h4>User Input</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-1">
                        {satu}
                        <input className='form-control no-left input-size' type="text" id="first" onChange={this.handleChange}/>
                    </div>
                    <div className="input-group mb-1">
                        {dua}
                        <input className='form-control no-left input-size' type="text" id="second" onChange={this.handleChange}/>
                    </div>
                    
                    {this.tapeMaker()}
                </form>
                <h4 class="my-3">Turing Machine :</h4>
            </div>
        )
    }
}


export default Input;