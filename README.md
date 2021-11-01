# Secrets manager secrets as environment variables

Inspired by [this blog post](https://aws.amazon.com/blogs/compute/creating-aws-lambda-environmental-variables-from-aws-secrets-manager/)

**work in progress**

## Thoughts about the architecture

After reading the blog post a couple of times, I had a hard time justifying the complexity of the presented architecture.

As I compared this solution with having a middleware that does the same thing, I concluded that this solution would play nicely whenever your organization is not homogenous in terms of used programming language.

## Learnings

- Please note that **the _wrapper scripts_ are not supported for every runtime**.

  - I was trying to debug **why was my _wrapper script_ ignored when I used the Go runtime**. It turns out that **_wrapper scripts_ do not support that runtime**.
  - You can **test** your _wrapper scripts_ via **the `Test` button in AWS console**.

- If you use **the `Test` button in the AWS console to test the _wrapper script_ beware!**

  - For some reason, **the logs from the _wrapper script_ will not be presented in the `test` button view**.
  - You will need to **dive into _CloudWatch Logs_ to see the _wrapper script_ logs**.

- For some reason the _wrapper script_ does not seem to be invoked, how is that possible?

- Are wrapper scripts benefiting from the [increased power the "pre-handler" code is usually benefiting from](https://hichaelmart.medium.com/shave-99-93-off-your-lambda-bill-with-this-one-weird-trick-33c0acebb2ea)?
  - The article mentions the _init phase_. Since the _AWS Lambda extensions_ are executed in that phase this makes me thing that this is the case.
