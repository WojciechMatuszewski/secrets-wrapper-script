# Secrets manager secrets as environment variables

Inspired by [this blog post](https://aws.amazon.com/blogs/compute/creating-aws-lambda-environmental-variables-from-aws-secrets-manager/).

This repo contains the above example in a slimmed-down version. I've extracted the parts I was not familiar with and implemented them.

## Deployment

- `npm run bootstrap`

- `npm run deploy`

## Thoughts about the architecture

After reading the blog post a couple of times, I had a hard time justifying the complexity of the presented architecture.

As I compared this solution with having a middleware that does the same thing, I concluded that this solution would play nicely whenever your organization is not homogenous in terms of used programming language.

## Alternatives

One alternative that comes to my mind is an _RPC style_ _AWS Lambda extension_. Something akin to the [_AWS AppConfig_ extension](https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-integration-lambda-extensions.html).

While this architecture has fewer moving pieces, I'm not a 100% fan of the _wrapper scripts_ as means of invoking binaries. It just feels weird.
It may also be the case that it's the first time I'm writing them, so my perspective might be skewed towards the things I know more about.

## Learnings

- Please note that **the _wrapper scripts_ are not supported for every runtime**.

  - I was trying to debug **why was my _wrapper script_ ignored when I used the Go runtime**. It turns out that **_wrapper scripts_ do not support that runtime**.

  - You can **test** your _wrapper scripts_ via **the `Test` button in AWS console**.

- The **_wrapper script_ runs on cold start only**. This seems reasonable.

  - Since this is the case, **all _wrapper script_ related logs** will only **show up** during the **cold start**.
    Please keep this in mind, as you might be pulling your hair by not seeing logs (that is what I did).

  - Please note that **only the output from the script itself will be logged**. If your script invokes an executable, the logs from that executable will not be visible in the _CloudWatch Logs console_.

  - To **view the _wrapper script_ logs, use the _CloudWatch Logs_ console**. The `test` result logs do not include them – this might be confusing at first.

- Make sure that the executable the _wrapper script_ is executing is compatible with the _AWS Lambda_ runtime the layer is targeting.
  I believe that, in most cases, making sure the executable is Linux-compatible will do.

- Are wrapper scripts benefiting from the [increased power the "pre-handler" code is usually benefiting from](https://hichaelmart.medium.com/shave-99-93-off-your-lambda-bill-with-this-one-weird-trick-33c0acebb2ea)?

  - The article mentions the _init phase_. Since the _AWS Lambda extensions_ are executed in that phase, I think this is the case.

  - Is the increase in compute capabilities the article mentions bound to the CPU? Do we get more network throughput as well?

  - Hypothesis: **that is indeed the case. To be explored in another repo**.
