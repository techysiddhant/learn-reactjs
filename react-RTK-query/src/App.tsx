
import './App.css'
import { useAddContactMutation, useContactQuery, useContactsQuery, useDeleteContactMutation, useUpdateContactMutation } from './services/ContactsApi'
const ContactDetail = ({ id }: { id: number }) => {
  const { data } = useContactQuery(id);
  return (
    <div>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>
  )
}
function App() {
  const { isLoading, isFetching, isError, isSuccess, data } = useContactsQuery();
  // console.log(data);
  return (
    <div>
      <h1>React Redux ToolKit RTK Query Tutorial</h1>
      {isLoading && <h2>Loading......</h2>}
      {isFetching && <h2>Fetching......</h2>}
      {isError && <h2>Error......</h2>}
      <div>
        <AddContact />
      </div>
      {isSuccess && (
        <div>
          {data?.map((contact) => (
            <div key={contact.id}>
              <h2>{contact.name}</h2>
              <h2>{contact.email}</h2>
              <ContactDetail id={contact.id} />
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const contact = {
    id: 4,
    name: 'test-4',
    email: 'test4@sid.com'
  }
  const contactUpdated = {
    id: 4,
    name: 'test-4 Updated',
    email: 'test4@sid.com'
  }
  const addHandler = async () => {
    await addContact(contact);
  }
  const updateHandler = async () => {
    await updateContact(contactUpdated);
  }
  const deleteHandler = async () => {
    await deleteContact(contact.id);
  }
  return (
    <div>
      <button onClick={addHandler}>Add Contact</button>
      <button onClick={updateHandler} disabled={isUpdating}>{isUpdating ? "Updating..." : "Update Contact"}</button>
      <button onClick={deleteHandler} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete Contact"}</button>
    </div>
  )
}

export default App
