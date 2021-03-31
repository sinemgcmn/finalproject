import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "./axios";
import Family from "./family";
import Sitter from "./sitter";
import Presentational from "./presentational";
import Uploader from "./uploader";
import OtherProfile from "./otherProfile";
import { Chat } from "./chat";
// import Rate from "./rate";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            place: null,
            first: "",
            last: "",
            imageUrl: "",
            bio: "",
            services: "",
            home: "",
            skills: "",
            pet: "",
            id: "",
            rate: "",
            uploaderIsVisible: false,
            isRequestEnded: false,
        };
    }

    componentDidMount() {
        axios
            .get("/sitter")
            .then(({ data }) => {
                console.log("app", data);
                if (data.success[0]) {
                    this.setState({
                        first: data.success[0].first_name,
                        last: data.success[0].last_name,
                        imageUrl: data.success[0].imageurl,
                        bio: data.success[0].bio,
                        services: data.success[0].services,
                        home: data.success[0].home,
                        skills: data.success[0].skills,
                        pet: data.success[0].pet,
                        id: data.success[0].id,
                        isRequestEnded: true,
                        rate: data.success[0].rate,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios GET/ user:", err);
                this.setState({
                    isRequestEnded: true,
                });
            });
    }

    chatVisible() {
        this.setState({
            chatVisible: !this.state.chatVisible,
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    updateImgUrlApp(imageUrl) {
        console.log("Im running in App!!! and my argument is: ", imageUrl);
        this.setState({ imageUrl: imageUrl });
    }

    updateBio(bio) {
        // console.log(arguments);
        // console.log("bio", bio);
        this.setState({ bio: bio });
    }

    updateService(services) {
        this.setState({ services: services });
    }

    updateHome(home) {
        this.setState({ home: home });
    }

    updateSkills(skills) {
        this.setState({ skills: skills });
    }

    updatePet(pet) {
        // console.log("Im running in App!!! and my argument is: ", pet);
        this.setState({ pet: pet });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div>
                        {this.state.isRequestEnded && (
                            <div>
                                <Presentational
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageUrl={this.state.imageUrl}
                                    toggleUploader={() => this.toggleUploader()}
                                    classForImgSmall="profile-pic"
                                />
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <Sitter
                                            id={this.state.id}
                                            first={this.state.first}
                                            last={this.state.last}
                                            imageUrl={this.state.imageUrl}
                                            toggleUploader={() =>
                                                this.toggleUploader()
                                            }
                                            bio={this.state.bio}
                                            services={this.state.services}
                                            home={this.state.home}
                                            skills={this.state.skills}
                                            pet={this.state.pet}
                                            rate={this.state.rate}
                                            updateBio={(bio) =>
                                                this.updateBio(bio)
                                            }
                                            updateService={(services) =>
                                                this.updateService(services)
                                            }
                                            updateHome={(home) =>
                                                this.updateHome(home)
                                            }
                                            updateSkills={(skills) =>
                                                this.updateSkills(skills)
                                            }
                                            updatePet={(pet) =>
                                                this.updatePet(pet)
                                            }
                                            chatVisible={() =>
                                                this.chatVisible()
                                            }
                                        />
                                    )}
                                />
                                <Route path="/family" component={Family} />

                                {/* <Route path="/chat" component={Chat} /> */}
                                <Route
                                    path="/sitter/:id"
                                    render={(props) => (
                                        <OtherProfile
                                            key={props.match.url}
                                            match={props.match}
                                            history={props.history}
                                            chatVisible={() =>
                                                this.chatVisible()
                                            }
                                        />
                                    )}
                                />
                            </div>
                        )}

                        {this.state.uploaderIsVisible && (
                            <Uploader
                                updateImgUrlApp={(imageUrl) =>
                                    this.updateImgUrlApp(imageUrl)
                                }
                                toggleUploader={() => this.toggleUploader()}
                                classForImgBig="profile-big"
                            />
                        )}

                        {!this.state.chatVisible && (
                            <div
                                id="chatButton"
                                onClick={() => this.chatVisible()}
                            ></div>
                        )}
                        {this.state.chatVisible && (
                            <div id="chatPopover">
                                <Chat
                                    chatVisible={this.chatVisible.bind(this)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
