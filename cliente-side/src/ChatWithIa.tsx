import { useState } from "react";
import { Button, Spinner } from "reactstrap";
import  serverSide from './api/server'

export default function ChatWithIa() {
    const [showChat, setShowChat] = useState(false)
    const [awaitIaResponse, setAwaitIaResponse] = useState(false)
    const [messages, setMessages] = useState([
        {
            text: 'Olá, como posso te ajudar?',
            isMyMessage: false
        }
    ])
    const [text, setText] = useState('')

    const toggleChat = () => {
        setShowChat(!showChat)
    }

    const sendMessage = async () => {
        setMessages((prev) => [...prev, { text, isMyMessage: true }])
        setText('')
        setAwaitIaResponse(true)
        const sendMessage = await serverSide.makeQuestionForIa(text)
        setAwaitIaResponse(false)
        setMessages((prev) => [...prev, { text: sendMessage, isMyMessage: false }])
    }

    return (
        <>
        {
            showChat && (
                <div className="chat-ia m-3">
                    <div className="chat-ia-header">
                        <h2>Chat Com o Chefe I.A</h2>
                        <Button onClick={() => toggleChat()} className="button-close" color="danger">X</Button>
                    </div>
                    <div className={`chat-ia-body`}>
                        {messages.map((message, index) => (
                            <p className={ message.isMyMessage ? 'myMessage' : 'iaMessage'} key={index}>{message.text}</p>
                        ))}
                        {
                            awaitIaResponse && (
                                <Spinner className="m-2 p-1" /> 
                            )
                        }
                     
                    </div>
                    <div className="chat-ia-footer">
                        <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Digite sua mensagem" />
                        <Button disabled={awaitIaResponse || text === ''} onClick={() => sendMessage()} className="button-send m-1" color="primary">Enviar</Button>
                    </div>
                </div>
            )
        }

          <Button onClick={() => toggleChat()} className="button-ia" color="succes">I.A</Button>
        </>
    )

}