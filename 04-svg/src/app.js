import router from './router'
import homeTpl from './templates/home.hbs'
import simpleTpl from './templates/simple.hbs'
import styleTpl from './templates/style.hbs'
import animationTpl from './templates/animation.hbs'
import textTpl from './templates/text.hbs'
import interactionTpl from './templates/interaction.hbs'
import notFoundTpl from './templates/not-found.hbs'

const app = document.getElementById('app')

function index() {
  app.innerHTML = homeTpl()
}

function simple() {
  app.innerHTML = simpleTpl()
}

function style() {
  app.innerHTML = styleTpl()
}

function animation() {
  app.innerHTML = animationTpl()
}

function text() {
  app.innerHTML = textTpl()
}

function interaction() {
  app.innerHTML = interactionTpl()
}

function notFound() {
  app.innerHTML = notFoundTpl()
}
router('/', index)
router('/simple', simple)
router('/style', style)
router('/animation', animation)
router('/text', text)
router('/interaction', interaction)
router('*', notFound)
router()
