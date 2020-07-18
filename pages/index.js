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

        <label for="email"><em>Your</em> Email Address:</label>
        <input id="email" name="email" type="email" value=""
               required placeholder="your.name@email.com" />



        <button class="button-success pure-button button-xlarge">
            <i class="fa fa-paper-plane"></i>&nbsp;Send
        </button>

    </form>

    <div style="display:none;" id="thankyou_message">
        <h2>
            <em>Thanks</em> for contacting us!
            We will get back to you soon!
        </h2>
    </div>


    <script data-cfasync="false" type="text/javascript"
            src="https://cdn.rawgit.com/dwyl/learn-to-send-email-via-google-script-html-no-server/master/form-submission-handler.js"></script>
   
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
