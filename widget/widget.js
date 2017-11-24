'use strict'
// Write your module here
// It must attach an object to the window that exposes a function getFields(). 
// getFields() should return a list of  { name:label } pairs describing all the fields in each frame

window.top.widget = []

async function makeObjectFromForm() {
    for(const form of document.forms) {
        for(const element of form.elements) {
           const key = element.name || elemengt.id
           const label = [...form.getElementsByTagName('label')]
           const value = label.find(element => element.htmlFor === key).textContent
           const object = {}
           object[key] = value
           window.top.widget.push(object)
        }
    }
}

async function sortObjectByAscending() { 
    window.top.widget.sort((a,b) => {
        return Object.keys(a)[0].localeCompare(Object.keys(b)[0]) 
    })
    console.log(window.top.widget)
}

async function attachObjectToWindow() {
    const event = new CustomEvent('frames:loaded', { 
        detail: { widget: window.top.widget }, 
        bubbles: true, 
        cancelable: false })

    window[event.detail.widget] = {
        getFields: () => {
            return window.top.widget
        }
    }
    console.log('trigger frames:loaded event')
    document.dispatchEvent(event) 
}

async function execute() {
    try {
        await makeObjectFromForm()
        if (window == window.top) {
            await sortObjectByAscending()
            await attachObjectToWindow()
        } 
    } catch(e) {
        console.error(e)
    }
}

window.onload = () => {
    execute()
}