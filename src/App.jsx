import React from 'react'
import defaultDataset from './dataset'
import './assets/styles/style.css'
import { AnswersList, Chats } from './components/index'
import { FormDialog } from './components/Forms/index'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: defaultDataset,
      open: false,
    }
    this.selectAnswer = this.selectAnswer.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question',
    })
    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId,
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === 'init':
        this.displayNextQuestion(nextQuestionId)
        break

      case nextQuestionId === 'contact':
        this.handleClickOpen()
        break

      case /^https:*/.test(nextQuestionId):
        const a = document.createElement('a')
        a.href = nextQuestionId
        a.target = '_blank'
        a.click()
        break

      default:
        const chat = {
          text: selectedAnswer,
          type: 'answer',
        }

        const chats = this.state.chats
        chats.push(chat)

        this.setState({
          chats: chats,
        })

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500)
        break
    }
  }

  componentDidMount() {
    const initAnswer = ''
    this.selectAnswer(initAnswer, this.state.currentId)
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList
            answers={this.state.answers}
            select={this.selectAnswer}
          />
          <FormDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    )
  }
}

export default App
