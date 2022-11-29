import { component$ } from "@builder.io/qwik";
import TaskItem from "./task-item";

export default component$(() => {
    const taskList = [{
        title: '1',
    }, {
        title: '1'
    }, {
        title: '1'
    }, {
        title: '1'
    }, {
        title: '1'
    }, {
        title: '1'
    }, {
        title: '1'
    }, {
        title: '1'
    }, {
        title: '1'
    }, {
        title: '1'
    },]
    return (
        <div id="tasks" class="mb-3">
        {taskList.map(() => <div > <TaskItem></TaskItem> </div>)}
    </div>
        
    )
})