import React, { useEffect, useState } from 'react'
import { data } from "./data/data"
import { ItemType } from './types/types';
import edit from "./images/edit.png"
import editGray from "./images/editgray.png"
import garbageGray from "./images/garbageGray.png"
import garbageRed from "./images/garbageREd.png"
import pluse from "./images/pluse.png"
import Modal from 'react-modal';

Modal.setAppElement('#root')



const App = () => {
  const [newTask, setNewTask] = useState<string>("")
  const [dataUpdate, setDataUpdate] = useState(data)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<{ id: number | null, task: string }>({ id: null, task: "" });




  // Přidání nového úkolu
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTask.length < 1) {
      alert("Vyplnte úkol")
    } else {
      const task = {
        task: newTask,
        status: false,
        id: new Date().getTime(),
        date: new Date().toLocaleDateString()
      }

      setDataUpdate(
        [...dataUpdate, task]
      )

    }
    setNewTask("")

  };

  // Otevření modelu
  const openEditModal = (taskToEdit: ItemType) => {
    setEditingTask({ id: taskToEdit.id, task: taskToEdit.task });
    setIsModalOpen(true);
  };

  // Uložení změn po meditaci
  const saveTaskEdit = () => {
    const updatedData = dataUpdate.map((task) => {
      if (task.id === editingTask.id) {
        return { ...task, task: editingTask.task };
      }
      return task;
    });

    setDataUpdate(updatedData);
    setIsModalOpen(false);
    setEditingTask({ id: null, task: "" }); // Resetujte editingTask po uložení
  };




  // Smazání úkolu
  const deleteTask = (taskId: number) => {
    const updatedData = dataUpdate.filter((one) => one.id !== taskId)
    setDataUpdate(updatedData)
  }

  // Všechny úkoly jsou hotové 
  const allTaskDone = () => {
    const updatedData = dataUpdate.map((task) => {
      if (task.status === false) {
        return { ...task, status: true }
      }
      return task
    })

    setDataUpdate(updatedData)
  }

  // Změna přepnutí 
  const toggleStatus = (taskId: number) => {
    const updatedData2 = dataUpdate.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: !task.status }
      }
      return task
    })
    setDataUpdate(updatedData2)
  }


  return (
    <section className='bg-gray-100 min-h-screen flex items-center justify-center'>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="mx-auto bg-white rounded-lg shadow-lg p-5 max-w-sm w-full"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
      >
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Uložit</h2>
          <input
            type="text"
            value={editingTask.task}
            onChange={(e) => setEditingTask({ ...editingTask, task: e.target.value })}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button
            onClick={saveTaskEdit}
            className="mt-4 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </Modal>
      <div className='border border-gray-300 shadow-lg rounded-lg min-w-[450px] bg-white'>
        <div className='bg-blue-500 px-6 py-4 rounded-t-lg'>
          <h1 className='text-center text-white text-2xl font-bold'>ToDo App</h1>
          <form className='flex justify-between items-center pt-4' onSubmit={submitForm}>
            <input
              className='flex-grow mr-2 p-2 rounded border border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:outline-none transition-colors'
              onChange={(e) => setNewTask(e.target.value)}
              placeholder='Přidat nový úkol...'
              value={newTask}
            />
            <button
              type='submit'
              className='  '
            >
              <img className='w-[45px]' src={pluse} alt="Přidat" />
            </button>
          </form>
        </div>
        <ul className='p-4'>
          {dataUpdate.map((one) => (
            <li className="flex justify-between items-center border-b border-gray-300 py-2" key={one.id}>

              <span className={`${one.status ? 'line-through text-gray-400' : 'text-gray-700'} pl-2 px-4`}>{one.date}</span>

              <span className={`flex-grow ${one.status ? 'line-through text-gray-400' : 'text-gray-700'}`}>{one.task}</span>
              <div className='flex items-center'>
                <input
                  className='form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-300 mr-2'
                  checked={one.status}
                  type="checkbox"
                  onChange={() => toggleStatus(one.id)}
                />

                {/* Editace úkolu */}
                {!one.status ? (<button onClick={() => openEditModal(one)} className='text-sm p-1 hover:bg-gray-200 focus:ring-blue-300  rounded'><img className='w-[35px]' src={edit} alt="Upravit" /></button>) : (<button className='text-sm p-1 hover:bg-gray-200 focus:ring-blue-300  rounded'><img className='w-[35px]' src={editGray} alt="Upravit" /></button>)}




                {/* Vymazání úkolu */}
                {one.status ? (<button ><img className='w-[35px]' src={garbageGray} alt="" /></button>) : (<button onClick={() => deleteTask(one.id)}><img className='w-[35px]' src={garbageRed} alt="" /></button>)}





              </div>
            </li>
          ))}
        </ul>
        <div className='bg-blue-500 px-6 py-4 rounded-b-lg flex items-center justify-center'> <button className="border px-2 py-2 rounded-lg bg-gray-200 hover:bg-gray-50" onClick={() => allTaskDone()}>Všechny úkoly hotové</button></div>
      </div>
    </section >

  )
}

export default App
