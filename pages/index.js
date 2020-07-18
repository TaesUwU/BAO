import matter from 'gray-matter'

import Layout from '../components/Layout'
import PostList from '../components/PostList'

const Index = ({ posts, title, description, ...props }) => {
  return (
    <Layout pageTitle={title}>
      <h1 className="title">Welcome to my server bitch!</h1>
  
      <form id="gform" method="POST" class="pure-form pure-form-stacked" data-email="from_email@example.com"
          action="https://script.google.com/macros/s/AKfycbxVhHwzG_ERorwUpj1Hl7slXr8efseWNLBTkvdalg/exec">




        <label for="name">Name: </label>
        <input id="name" name="name" placeholder="What your Mom calls you" />

        <br>


        <label for="message">Message: </label>
        <textarea id="message" name="message" rows="10"
                  placeholder="Tell us what's on your mind..."></textarea>

        <br>


        <button class="button-success pure-button button-xlarge">
            <i class="fa fa-paper-plane"></i>&nbsp;Send
        </button>

    </form>
   
      <p className="description">{description}</p>
      <main>
        <PostList posts={posts} />
      </main>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const value = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })
    return data
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
