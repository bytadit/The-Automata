import React, { Component } from 'react'

class Tambah extends Component {
    state = {
        iter: 1,
        newList: [],
        pos: -1,
        auto: 'Auto',
        manual: 'Start'
    }

    listUpdate = (x,i) =>{
        
        let temp = this.state.newList.slice()
        temp[i] = x
        this.setState({
            newList:temp
        }, () => console.log("iterasi " + i +" diganti " + x))
        
    }
    start(){
        switch (this.state.pos) {
            case -1 : this.init();  break;
            case 0  : this.q0();   break;
            case 1  : this.q1();  break;
            case 2  : this.q2();  break;
            case 3  : this.q3();  break;
            case 4  : this.q4(); break;
            case 5  : this.q5();  break;
            default :   break;
        }
    }
    
    stateUpdate = (i,pos) => {
        this.setState({
            iter: i, pos: pos,
        })
    }
    init(){
        this.stateUpdate(this.state.iter, 0)
    }
    q0(){
        if(this.state.newList[this.state.iter] === 0){
            this.listUpdate('B', this.state.iter)
            this.stateUpdate(this.state.iter+1, 1)
        }else if(this.state.newList[this.state.iter] === 1){
            this.listUpdate('B', this.state.iter)
            this.stateUpdate(this.state.iter+1, 5)
        }
    }
    q1(){
        console.log("iter " +  this.state.iter)
        if(this.state.newList[this.state.iter] === 0){
            this.stateUpdate(this.state.iter+1, 1)
        }else if(this.state.newList[this.state.iter] === 1){
            this.stateUpdate(this.state.iter+1, 2)
        }
    }
    q2(){
        if(this.state.newList[this.state.iter] === 0){
            this.stateUpdate(this.state.iter+1, 2)
        }else if(this.state.newList[this.state.iter] === 'B' ){
            let temp = this.state.newList; temp.push('B'); this.setState({newList:temp})
            this.listUpdate(0, this.state.iter)
            this.stateUpdate(this.state.iter-1, 3)
        }
    }
    q3(){
        if(this.state.newList[this.state.iter] === 0){
            this.stateUpdate(this.state.iter-1, 3)
        }else if(this.state.newList[this.state.iter] === 1){
            this.stateUpdate(this.state.iter-1, 4)
        }
    }
    q4(){
        if(this.state.newList[this.state.iter] === 0){
            this.stateUpdate(this.state.iter-1, 4)
        }else if(this.state.newList[this.state.iter] === 'B' ){
            this.stateUpdate(this.state.iter+1, 0)
        }
    }
    q5(){
        console.log("ENDED")
        console.log("ENDED")
    }
    handleClick = () =>{
        if(this.state.newList.length === 0){
            this.setState({
                newList: [...this.props.variable.list],
                manual: 'Next'
            }, () => this.start(), console.log(this.state.newList) )
        }else{
            this.start()
        }   
    }
    handleAuto = () =>{
        this.setState({
            auto: 'SpeedUp',
        })
        if(this.state.newList.length === 0){
            this.setState({
                newList: [...this.props.variable.list],
            }, () => this.start() )
        }else if(this.state.pos !== 5 ){ //TERMINATE THE LOOP
            this.start()
            setTimeout(this.handleAuto, 1000);
        }else if(this.state.pos == -1){
            clearTimeout(this.handleAuto)
        }
    }
    handleReset= () =>{
        clearTimeout(this.handleAuto)
        this.setState({
            newList: [],
            iter: 1,
            pos: -1,  //-1 karena kalau initiate tu belum dirubah
            auto: 'Auto',
            manual: 'Start'
        }, () => console.log(this.state.newList))
    }

    tapeMaker = (props) =>{
        const print = this.state.newList.map((val, i) => {
            if(i === this.state.iter){
                return(
                    <div className="box white">
                        {val}
                    </div>   
                )
            }else{
                return (
                    <div className="box">
                        {val}
                    </div>  
                )
            } 
        })
        return(
            <div>
                <input className='bttn manual' type="submit" id="manual" value={this.state.manual} onClick={() => this.handleClick()}/>
                <input className='bttn auto' type="submit" id="auto" value={this.state.auto} onClick={() => this.handleAuto()}/>
                <input className='bttn' type="submit" id="" value="Reset" onClick={() => this.handleReset()}/>
                <div className="scroll-container">
                    {print}
                </div>
            </div>
        )
    }

    render(){
        return(
            <div>
                {this.tapeMaker()}
            </div>
        )
    }
}

export default Tambah