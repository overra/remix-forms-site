import hljs from 'highlight.js/lib/common'
import { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { formAction } from 'remix-forms'
import { z } from 'zod'
import Form from '~/ui/form'
import { metaTags } from '~/helpers'
import { makeDomainFunction } from 'remix-domains'
import Example from '~/ui/example'
import { useFetcher } from '@remix-run/react'
import Checkbox from '~/ui/checkbox'
import Label from '~/ui/label'

const title = 'useFetcher'
const description =
  "In this example, we useFetcher to simulate adding items to a to-do list. We don't save them anywhere, but in real life you know what to do 😉"

export const meta: MetaFunction = () => metaTags({ title, description })

const code = `const schema = z.object({ name: z.string().nonempty() })

const create = makeDomainFunction(schema)(async (values) => values)

export const action: ActionFunction = async ({ request }) =>
  formAction({ request, schema, mutation: create })

export default () => {
  const fetcher = useFetcher()
  const name = fetcher.data?.name

  return (
    <Example title={title} description={description}>
      <Form fetcher={fetcher} schema={schema}>
        {({ Field, Errors, Button }) => (
          <>
            {name ? (
              <div className="flex items-center space-x-2">
                <Checkbox />
                <Label>{name}</Label>
              </div>
            ) : null}
            <div className="flex justify-end space-x-2">
              <Field
                name="name"
                className="flex-1 flex-col space-y-2"
                placeholder="Add to-do"
                autoFocus
              >
                {({ SmartInput, Errors }) => (
                  <>
                    <SmartInput />
                    <Errors />
                  </>
                )}
              </Field>
              <Button className="h-[38px] self-start" />
            </div>
            <Errors />
          </>
        )}
      </Form>
    </Example>
  )
}`

const schema = z.object({ name: z.string().nonempty() })

export const loader: LoaderFunction = () => ({
  code: hljs.highlight(code, { language: 'ts' }).value,
})

const create = makeDomainFunction(schema)(async (values) => values)

export const action: ActionFunction = async ({ request }) =>
  formAction({ request, schema, mutation: create })

export default function Component() {
  const fetcher = useFetcher()
  const name = fetcher.data?.name

  return (
    <Example title={title} description={description}>
      <Form fetcher={fetcher} schema={schema}>
        {({ Field, Errors, Button }) => (
          <>
            {name ? (
              <div className="flex items-center space-x-2">
                <Checkbox />
                <Label>{name}</Label>
              </div>
            ) : null}
            <div className="flex justify-end space-x-2">
              <Field
                name="name"
                className="flex-1 flex-col space-y-2"
                placeholder="Add to-do"
                autoFocus
              >
                {({ SmartInput, Errors }) => (
                  <>
                    <SmartInput />
                    <Errors />
                  </>
                )}
              </Field>
              <Button className="h-[38px] self-start" />
            </div>
            <Errors />
          </>
        )}
      </Form>
    </Example>
  )
}