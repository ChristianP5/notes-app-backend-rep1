const notes = require('./notes');
const { nanoid } = require('nanoid');
/*
{
 id: string,
 title: string,
 createdAt: string,
 updatedAt: string,
 tags: array of string,
 body: string,
},
*/


const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        id, title, tags, body, createdAt, updatedAt
    }

    notes.push(newNote);

    const isSuccess = notes.filter((note)=>note.id === id).length > 0;

    if(isSuccess){
        const response = h.response({
            status: "success",
            message: "note succesfully added",
            data:{
                noteId: id,
            }
    
        })

        response.code(200);
        return response;
    }else{
        const response = h.response({
            status: "fail",
            message: "failed to add note",
        })

        response.code(500);
        return response;
    }

    
}

const getAllNotesHandler = (request, h)=>{
    const response = h.response({
        status: "success",
        data: {
            notes,
        }
    })

    response.code(200);
    return response;
}

const getNotesByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter(note=>note.id === id)[0];

    if(note !== undefined){
        const response = h.response({
            status: "success",
            data: {
                note,
            }
        })
    
        response.code(200);
        return response;
    }else{
        const response = h.response({
            status: "fail",
            message: `note with id=${id} doesn't exist`,
        })
    
        response.code(404);
        return response;
    }
}

const editNoteByIdHandler = (request, h)=>{
    const { id } = request.params;

    const { title, tags, body } = request.payload;

    const updatedAt = new Date().toISOString();

    const index = notes.findIndex(note=>note.id===id);

    if(index!==-1){
        notes[index] = {
            ...notes[index],
            title, tags, body, updatedAt,
        }

        const response = h.response({
            status: "success",
            message: "note updated succesfully!"
        })

        response.code(200);
        return response;
    }else{
        const response = h.response({
            status: "fail",
            message: `note with id=${id} doesn't exist`,
        })

        response.code(404);
        return response;

    }
}

const deleteNoteByIdHandler = (request, h)=>{
    const { id } = request.params;
    
    const index = notes.findIndex(note=>note.id===id);

    if(index!==-1){
        notes.splice(index,1);

        const response = h.response({
            status: "success"
        })

        response.code(200);
        return response;
    }else{
        const response = h.response({
            status: "fail",
            message: `note with id=${id} doesn't exist`
        })

        response.code(404);
        return response;
    }
}


module.exports = { addNoteHandler, getAllNotesHandler, getNotesByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };