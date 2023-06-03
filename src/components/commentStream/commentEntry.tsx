"use client";

import styles from "./styles.module.scss";
import intlFormatDistance from "date-fns/intlFormatDistance"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faReply, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Button from "../button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../shadcn/dropdown-menu";
import { User, CreditCard, Settings, Keyboard, Users, UserPlus, Mail, MessageSquare, PlusCircle, Plus, Github, LifeBuoy, Cloud, LogOut } from "lucide-react";

type CommentEntryProps = {
    user: {
        fullName: string,
        imageUrl?: string,
        id: string,
        username?: string
    },
    datePublished: Date,
    content: string,
    id: string,
    responses?: Array<CommentEntryProps>
}

export default function CommentEntry(props:CommentEntryProps) {
    
    return (
        <div className={styles.entry}>
            <div className={styles.content}>
                <div className={styles.head}>
                    <img src={props.user.imageUrl ?? "https://assets.slantedpress.com/dp/x"} alt="" />
                    <p>
                        <Link href={`/users/${props.user.id}`}>{props.user.fullName}</Link>
                        <span>{intlFormatDistance(props.datePublished, Date.now())}</span>
                    </p>
                    <CommentMenu />
                </div>
                <div className={styles.body}>
                    <p>{props.content}</p>
                </div>
                <div className={styles.foot}>
                    <Button intent="secondary">
                        <FontAwesomeIcon icon={faReply} />
                        Reply
                    </Button>
                    <Button intent="secondary">
                        <FontAwesomeIcon icon={faThumbsUp} />
                        0
                    </Button>
                </div>
            </div>
            {props.responses ? (
                <>
                    {props.responses.map(r => {
                        return <CommentEntry {...r} key={r.id}/>  
                    })}
                </>
            ) : undefined}
        </div>
    )
}

function CommentMenu(){
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button><FontAwesomeIcon icon={faEllipsisVertical} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Keyboard shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Team</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Message</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>More...</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>New Team</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <Cloud className="mr-2 h-4 w-4" />
                    <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}