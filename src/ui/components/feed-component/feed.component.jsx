import "bootstrap/dist/css/bootstrap.min.css"
import { useMySocialNetworkApi } from "../../../api"
import { useGlobalUser } from "../../../context"
import { useState, useEffect } from "react"
import { PostComponent } from "../../components"
import { Container, Form, Row, Col, Dropdown, DropdownButton, Button } from "react-bootstrap"
import "./feed-component.style.css"

export function Feed() {
  const [inputValues, setInputValues] = useState({
    animalName: "",
    weigth: 0,
    age: 0,
    race: "",
    description: "",
  })
  const [posts, setPosts] = useState()
  const [error, setError] = useState(null)
  const useSocialNetworkApi = useMySocialNetworkApi()
  const [toggleFeed, settoggleFeed] = useState(false)

  async function getFeedPostsForUser() {
    try {
      const retrievedPosts = await useSocialNetworkApi.getFeedPosts(20, 0)
      setPosts(retrievedPosts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFeedPostsForUser()
  }, [useSocialNetworkApi])

  async function refreshFeed() {
    await getFeedPostsForUser()
    settoggleFeed(!toggleFeed)
  }

  function handleChange(changeEvent) {
    const { name, value } = changeEvent.target
    setInputValues((currentValues) => ({ ...currentValues, [name]: value }))
  }

  async function handleCreatePost(animalName, description, weigth, age, race) {
    try {
      const response = await useSocialNetworkApi.createPost(animalName, description, weigth, age, race, "semImagem")
      console.log(response)
      setError("")
      setError(response)
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  async function handleSubmit(submitEvent) {
    submitEvent.preventDefault()

    if (Object.values(inputValues).every((value) => value)) {
      await handleCreatePost(
        inputValues.animalName,
        inputValues.description,
        inputValues.weigth,
        inputValues.age,
        inputValues.race,
        "semImagem"
      )
      window.location.reload()
      return false
    } else {
      setError("Erro! está faltando dados!")
    }
  }

  function renderPosts() {
    if (posts) {
      if (posts.length > 1) {
        return posts
          .sort(function (postA, postB) {
            if (postA.postDate > postB.postDate) {
              return -1
            }
            if (postA.postDate < postB.postDate) {
              return 1
            }
            return 0
          })
          .map((post) => <PostComponent post={post} key={post.Id} onClick={refreshFeed} />)
      }
      if (posts.length === 1) {
        return <PostComponent post={posts[0]} />
      }
    }
  }

  return (
    <Container class="main-ws-sec">
      <div class="post-topbar">
        <Row>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col mb={8}>
                <div className="user-picy">
                  <img src="https://thispersondoesnotexist.com/image" alt="" />
                </div>
              </Col>
            </Row>
            <Form.Group className="mb-3 textAreaForm" controlId="exampleForm.ControlTextarea1">
              <Form.Group controlId="formFileLg" className="mb-3">
                <Form.Label>Foto do animal</Form.Label>
                <Form.Control type="file" size="lg" />
              </Form.Group>
              <Row>
                <Col md>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nome Animal</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Billy"
                      value={inputValues.animalName}
                      onChange={handleChange}
                      name="animalName"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Peso Estimado</Form.Label>
                    <Form.Control type="number" placeholder="10 KG" value={inputValues.weigth} onChange={handleChange} name="weigth" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Idade Estimada</Form.Label>
                    <Form.Control type="number" placeholder="5 Anos" value={inputValues.age} onChange={handleChange} name="age" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Raça</Form.Label>
                    <Form.Control type="text" placeholder="Shih-tzu" value={inputValues.race} onChange={handleChange} name="race" />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={11}
                      type="text"
                      placeholder="Descrição do animal"
                      value={inputValues.description}
                      onChange={handleChange}
                      name="description"
                      maxlength="70"
                      style={{ resize: "none" }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form.Group>
            <div style={{ minHeight: `30px` }}>{error ? <p>{error}</p> : null}</div>
            <Button variant="primary" type="submit">
              Postar
            </Button>
          </Form>
        </Row>
      </div>
      <div class="posts-section">
        {renderPosts()}
        <div class="process-comm">
          <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>
      </div>
    </Container>
  )
}
