import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../../api"
import Img from "../../../assets/img"
import Qualities from "../../ui/qualities/qualitiesList"
import SelectField from "../../common/form/selectField"
import { handleTime } from "../../../utils/functions"
import { validator } from "../../../utils/validator"

const UserPage = (userId) => {
    const idChecked = userId.userId
    const [users, setUsers] = useState([])
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [, setIdForCheckedUser] = useState()
    const [comments, setComments] = useState([])
    const [commentsForUser, setCommentsForUser] = useState("")
    const [newComment, setNewComment] = useState({})
    const [errors, setErrors] = useState({})
    useEffect(() => {
        let cleanupFunction = false
        try {
            api.users
                .fetchAll()
                .then((data) => {
                    setUsers(data)
                })
            api.users.getById(idChecked).then((data) => {
                if (!cleanupFunction) setUser(data)
            })
            api.comments.fetchAll().then((data) => {
                setComments(data)
            })
            api.comments.fetchCommentsForUser(idChecked).then((data) => {
                setCommentsForUser(data)
            })
        } catch (e) {
            console.error(e.message)
        }
        return () => (cleanupFunction = true)
    }, [])
    useEffect(() => {
        setComments(comments)
    }, [commentsForUser])
    const validateConfig = {
        name: {
            isRequired: {
                message: "Обязательно выберите имя для коментария",
            },
        },
        textarea: {
            isRequired: {
                message: "Для коментария заполните поле",
            },
            minRows: {
                message: "Коментарий должен минимум состоять из 3 строк",
                value: 3,
            },
        },
    }
    const handleNameChoose = (target) => {
        setNewComment({ ...newComment, userId: target.value, pageId: idChecked })
        setIdForCheckedUser(target.value)
    }
    const handleName = (arr, id) => {
        const items = Object.values(arr).map((item) => [item._id, item.name])
        let item = items.filter(item => item[0] === id)
        item = item.toString()
        return item.slice(item.indexOf(",") + 1)
    }
    const handleChange = ({ target }) => {
        setNewComment({ ...newComment, content: target.value })
    }
    const handleRemove = (id) => {
        api.comments.remove(id)
            .then(() => {
                const newComments = localStorage.getItem("comments")
                setComments(newComments)
            })
            .then(() => {
                api.comments.fetchCommentsForUser(idChecked).then((data) => {
                    setCommentsForUser(data)
                })
            })
    }
    useEffect(() => {
        validate()
    }, [newComment])
    const validate = () => {
        const errors = validator(newComment, validateConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValidate = validate()
        if (!isValidate) return
        setNewComment({ ...newComment, content: "" })
        api.comments.add(newComment)
            .then(() => {
                const newComments = localStorage.getItem("comments")
                setComments(newComments)
            })
            .then(() => {
                api.comments.fetchCommentsForUser(idChecked).then((data) => {
                    setCommentsForUser(data)
                })
            })
    }
    setTimeout(() => {
        setLoading(false)
    }, 2000)
    return (
        <div className="d-flex">
            { user ? (
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <Link
                                        to={ `/users/${user._id}/edit` }
                                        className="
                                        position-absolute
                                        top-0
                                        end-0
                                        btn btn-light btn-sm
                                    "
                                    >
                                        <i className="bi bi-gear"></i>
                                    </Link>
                                    <div
                                        className="
                                        d-flex
                                        flex-column
                                        align-items-center
                                        text-center
                                        position-relative
                                    "
                                    >
                                        { !loading && <Img /> }
                                        <div className="mt-3">
                                            <h4>{ user.name }</h4>
                                            <p className="text-secondary mb-1">
                                                { user.profession.name }
                                            </p>
                                            <div className="text-muted">
                                                <i
                                                    className="
                                                    bi bi-caret-down-fill
                                                    text-primary
                                                "
                                                    role="button"
                                                ></i>
                                                <i
                                                    className="
                                                    bi bi-caret-up
                                                    text-secondary
                                                "
                                                    role="button"
                                                ></i>
                                                <span className="ms-2">
                                                    { user.rate }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div
                                    className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                                >
                                    <h5 className="card-title">
                                        <span>Qualities</span>
                                    </h5>
                                    <p className="card-text">
                                        <Qualities qualities={ user.qualities } />
                                    </p>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card mb-3">
                                    <div
                                        className="
                                        card-body
                                        d-flex
                                        flex-column
                                        justify-content-center
                                        text-center
                                    "
                                    >
                                        <h5 className="card-title">
                                            <span>Completed meetings</span>
                                        </h5>
                                        <h1 className="display-1">
                                            { user.completedMeetings }
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 mb-3">
                            <div className="card mb-2">
                                <div className="card-body">
                                    <div>
                                        <h2>New comment</h2>
                                        <div className="mb-4">
                                            <SelectField
                                                label="Выберите пользователя"
                                                name="users"
                                                options={ users.map((user) => ({ value: user._id, name: user.name })) }
                                                defaultOption="Choose ..."
                                                onChange={ handleNameChoose }
                                                error={ errors.users }
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor="exampleFormControlTextarea1"
                                                className="form-label"
                                            >
                                                Сообщение
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                onChange={ handleChange }
                                                value={ newComment.content }
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
                                <button
                                    className="btn btn-primary aria-pressed='true'"
                                    type="button"
                                    disabled={ !isValid }
                                    onClick={ handleSubmit }
                                >
                                    Опубликовать
                                </button>
                            </div>
                            <div className={ "card mb-3" + (commentsForUser.length !== 0 ? "" : " border-light") }>
                                <div className="card-body">
                                    { commentsForUser.length !== 0 ? <><h2>Comments</h2><hr /></> : "" }
                                    { commentsForUser && commentsForUser.map((comment) => {
                                        return (<div className="bg-light card-body mb-3" key={ comment._id }>
                                            <div className="row">
                                                <div className="col">
                                                    <div
                                                        className="d-flex flex-start"
                                                    >
                                                        <img
                                                            src={ `https://avatars.dicebear.com/api/avataaars/${(
                                                                Math.random() +
                                                                1
                                                            )
                                                                .toString(
                                                                    36
                                                                )
                                                                .substring(
                                                                    7
                                                                )}.svg` }
                                                            className="rounded-circle shadow-1-strong me-3"
                                                            alt="avatar"
                                                            width="65"
                                                            height="65"
                                                        />
                                                        <div className="flex-grow-1 flex-shrink-1">
                                                            <div className="mb-4">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <p className="mb-1">
                                                                        <span className="small">{ users && handleName(users, comment.userId) } </span>
                                                                        <span className="small"> { users && handleTime(Date.now(), comment.created_at) }</span>
                                                                    </p>
                                                                    <button className="btn btn-sm text-primary d-flex align-items-center" onClick={ () => handleRemove(comment._id) }>
                                                                        <i className="bi bi-x-lg"></i>
                                                                    </button>
                                                                </div>
                                                                <p className="small mb-0">
                                                                    { comment.content }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                    }) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    { !loading ? (
                        <h2>{ `User with id: ${idChecked} not found` }</h2>
                    ) : (
                        <p>Loading ...</p>
                    ) }
                </div>
            ) }
        </div>
    )
}

export default UserPage
