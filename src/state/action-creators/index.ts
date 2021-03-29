
import { CellTypes } from './../cell';

import { UpdateCellAction,InsertCellBeforeAction,MoveCellAction,DeleteCellAction ,Direction} from './../actions';
import { ActionType } from './../action-types';



export const updateCell=(id:string,content:string):UpdateCellAction=>{
    return{
        type:ActionType.UPDATE_CELL,
        payload:{
            id,
            content
        }

    }
}

export const deleteCell=(id:string):DeleteCellAction=>{

    return{
        type:ActionType.DELETE_CELL,
        payload:id
    }
}

export const inserCellBefore=(id:string,cellType:CellTypes):InsertCellBeforeAction=>{
    return{
        type:ActionType.INSERT_CELL_BEFORE,
        payload:{
            id,
            type:cellType
        }
    }
}

export const moveCell=(id:string,direction:Direction):MoveCellAction=>{
    return{
        type:ActionType.MOVE_CELL,
        payload:{
            id,
            direction
        }
    }
}

