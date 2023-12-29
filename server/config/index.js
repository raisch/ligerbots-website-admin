const path = require('node:path')

module.exports = {
  title: 'Admin',
  description: 'Ligerbots Admin Management System',
  schools: ['north', 'south', 'none'],
  types: ['student', 'coach', 'mentor', 'parent', 'other'],
  roles: ['user', 'editor', 'admin', 'root'],
  defaults: {
    school: 'none',
    role: 'student'
  },
  paths: {
    static: path.resolve(__dirname, './../../public/_pages')
  }
}
