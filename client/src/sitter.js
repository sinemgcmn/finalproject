import BioEditor from "./bioEditor";
import Presentational from "./presentational";
import Service from "./service";
import Home from "./home";
import Skills from "./skills";
import Pet from "./pet";
import { Helmet } from "react-helmet";

export default function Sitter(props) {
    console.log("props in Sitter:", props);

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="sitter.css" />
            </Helmet>
            <div className="mostRecentProfile">
                <div className="searchProfile">
                    <div className="user-info">
                        <h1 className="mostRecentHeadlineProfile">
                            {props.first} {props.last}{" "}
                        </h1>
                        <div className="rating present">
                            <label className="full"> {props.rate}</label>
                        </div>
                        <h3
                            className="check-msg"
                            onClick={() => props.chatVisible()}
                        >
                            {" "}
                            Check your message{" "}
                        </h3>
                    </div>

                    <Presentational
                        imageUrl={props.imageUrl}
                        toggleUploader={props.toggleUploader}
                    />

                    <div className="info-block">
                        <BioEditor
                            first={props.first}
                            last={props.last}
                            bio={props.bio}
                            updateBio={(bio) => props.updateBio(bio)}
                        />
                        <Service
                            first={props.first}
                            last={props.last}
                            services={props.services}
                            updateService={(services) =>
                                props.updateService(services)
                            }
                        />
                        <Home
                            first={props.first}
                            last={props.last}
                            home={props.home}
                            updateHome={(home) => props.updateHome(home)}
                        />
                        <Skills
                            first={props.first}
                            last={props.last}
                            skills={props.skills}
                            updateSkills={(skills) =>
                                props.updateSkills(skills)
                            }
                        />
                        <Pet
                            first={props.first}
                            last={props.last}
                            pet={props.pet}
                            updatePet={(pet) => props.updatePet(pet)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
