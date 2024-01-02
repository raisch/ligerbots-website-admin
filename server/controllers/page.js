const path = require('node:path')
const { writeFile } = require('node:fs/promises')

const { mkdirp } = require('mkdirp')
const marked = require('marked')
const fm = require('front-matter')

const { title, description, paths } = require('../config')

const Page = require('../models/Page')

const utils = require('../lib/utils')

const view = 'pages'

/**
 * GET /pages
 */
exports.main = async (req, res) => {
  const messages = await req.flash('info')
  const locals = { title, description, utils }

  const perPage = 12
  const pageNum = req.query.page || 1

  try {
    const pages = await Page.aggregate([{ $sort: { path: 1 } }])
      .skip(perPage * pageNum - perPage)
      .limit(perPage)
      .exec()

    const count = await Page.countDocuments({})

    res.render('pages/main', {
      locals,
      pages,
      current: pageNum,
      numPages: Math.ceil(count / perPage),
      messages
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * GET /pages/new
 * New Page Form
 */
exports.new = async (req, res) => {
  const locals = {
    title: 'Add New Page',
    description
  }

  res.render(`${view}/new`, locals)
}

/**
 * POST /
 * Create New Page
 */
exports.save = async (req, res) => {
  console.log(req.body)

  const content = fm(req.body.content)

  const newPage = new Page({
    path: req.body.path,
    author: req.body.author,
    content: content.body,
    attributes: content.attributes || {}
  })

  try {
    await Page.create(newPage)
    await req.flash('info', 'Added new page.')
    res.redirect(`/${view}`)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Delete /pages/:id
 * Delete page route
 */
exports.delete = async (req, res) => {
  try {
    await Page.deleteOne({ _id: req.params.id })
    await req.flash('info', 'Page has been deleted.')
    res.redirect(`/${view}`)
  } catch (error) {
    console.log(error)
  }
}

/**
 * GET /pages/:id
 * User Data
 */
exports.show = async (req, res) => {
  try {
    const page = await Page.findOne({ _id: req.params.id })

    const locals = {
      title: 'Show Page',
      description,
      utils,
      page
    }

    res.render('pages/view', locals)
  } catch (error) {
    console.log(error)
  }
}

/**
 * GET /
 * Edit page
 */
exports.edit = async (req, res) => {
  try {
    const page = await Page.findOne({ _id: req.params.id })

    const locals = {
      title: 'Edit Page',
      description,
      utils,
      page
    }

    res.render('pages/edit', locals)
  } catch (error) {
    console.log(error)
  }
}

/**
 * GET /
 * Update page
 */
exports.update = async (req, res) => {
  try {
    await Page.findByIdAndUpdate(req.params.id, {
      path: req.body.path,
      author: req.body.author,
      content: req.body.content,
      updatedAt: Date.now()
    })
    await req.flash('info', 'Page updated.')
    await res.redirect('/pages')
  } catch (error) {
    console.log(error)
  }
}

exports.publish = async (req, res) => {
  const pageId = req.params.id

  console.log(`retrieving page with id ${pageId}`)
  let page
  try {
    page = await Page.findOne({ _id: pageId })
  } catch (err) {
    await req.flash(
      'error',
      `Failed to retrieve page with id: "${pageId}": ${err}`
    )
    await res.redirect('/pages')
    return
  }

  let pagePath = path.join(paths.static, '.', page.path)
  console.log(`pagePath: ${pagePath}`)

  let content
  try {
    content = marked.parse(page.content)
  } catch (err) {
    await req.flash(
      'error',
      `Failed to convert markdown for page at "${page.path}": ${err}`
    )
    await res.redirect('/pages')
    return
  }

  pagePath += '.html'
  console.log(`writing ${content.length} bytes to ${pagePath}: ${content}`)
  // const writer = createWriteStream(pagePath)

  try {
    await mkdirp(path.dirname(pagePath))
    await writeFile(pagePath, content)
  } catch (err) {
    await req.flash(
      'error',
      `Failed to write html for page at "${page.path}": ${err}`
    )
    await res.redirect('/pages')
    return
  }

  await req.flash('info', `Page published to "${page.path}.html"`)
  await res.redirect('/pages')
}
