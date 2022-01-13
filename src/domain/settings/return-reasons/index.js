import React, { useState, useEffect } from "react"
import { Flex, Text, Box } from "rebass"
import { navigate } from "gatsby"

import useMedusa from "../../../hooks/use-medusa"
import Card from "../../../components/card"
import Button from "../../../components/button"
import Spinner from "../../../components/spinner"
import BreadCrumb from "../../../components/molecules/breadcrumb"
import ReturnReasonsList from "./return-reasons-list"
import BodyCard from "../../../components/organisms/body-card"
import TwoSplitPane from "../../../components/templates/two-split-pane"
import PlusIcon from "../../../components/fundamentals/icons/plus-icon"
import DuplicateIcon from "../../../components/fundamentals/icons/duplicate-icon"
import TrashIcon from "../../../components/fundamentals/icons/trash-icon"

const ReturnReasons = () => {
  const { return_reasons, isLoading } = useMedusa("returnReasons")
  const parent_return_reasons = !isLoading
    ? return_reasons.filter(rr => !rr.parent_return_reason_id)
    : []

  const pageLength = 30
  const [numberOfPages, setNumberOfPages] = useState(
    Math.ceil(parent_return_reasons.length / pageLength)
  )
  // const [startIndex, setStartIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [showReasons, setShownReasons] = useState(
    parent_return_reasons.slice(0, pageLength)
  )

  useEffect(() => {
    if (!isLoading) {
      const startIndex = currentPage * pageLength
      setNumberOfPages(Math.ceil(parent_return_reasons.length / pageLength))
      setShownReasons(
        parent_return_reasons.slice(startIndex, startIndex + pageLength)
      )
    }
  }, [currentPage, isLoading])

  const onPreviousClick = () => {
    setCurrentPage(currentPage - 1)
  }

  const onNextClick = () => {
    setCurrentPage(currentPage + 1)
  }

  const pagination = (
    <Flex>
      {[...Array(numberOfPages).keys()].map(i => {
        const displayPage = i + 1
        return (
          <Text
            sx={{ cursor: "pointer" }}
            mr={2}
            fontWeight={i === currentPage ? "bold" : "normal"}
            onClick={() => setCurrentPage(i)}
          >
            {displayPage}
          </Text>
        )
      })}
    </Flex>
  )

  return (
    <div>
      <BreadCrumb
        previousRoute="/a/settings"
        previousBreadcrumb="Settings"
        currentPage="Return Reasons"
      />
      <TwoSplitPane>
        <BodyCard
          title="Return Reasons"
          actionables={[
            {
              label: "Add reason",
              icon: (
                <span className="text-grey-90">
                  <PlusIcon size={20} />
                </span>
              ),
            },
          ]}
          subtitle="Manage the markets that you will operate within"
        >
          <div className="mt-large">
            {isLoading ? (
              <Flex
                flexDirection="column"
                alignItems="center"
                height="100vh"
                mt="auto"
              >
                <Box height="75px" width="75px" mt="50%">
                  <Spinner dark />
                </Box>
              </Flex>
            ) : (
              showReasons.map(reason => (
                <RadioCard
                  label={
                    <>
                      <span className="inter-base-semibold">
                        {reason.label}
                      </span>
                      <span> (Value: {reason.value})</span>
                    </>
                  }
                  description={reason.description}
                  className="mt-xsmall"
                />
              ))
            )}
          </div>
        </BodyCard>
        <BodyCard
          actionables={[
            {
              label: "Duplicate reason",
              icon: <DuplicateIcon size={20} />,
            },
            {
              label: "Delete reason",
              variant: "danger",
              icon: <TrashIcon size={20} />,
            },
          ]}
          title="Details"
          subtitle="WRONG_SIZE"
        ></BodyCard>
      </TwoSplitPane>
    </div>
  )
}

export default ReturnReasons

const RadioCard = ({ label, description }) => {
  return (
    <div className="smthg flex items-baseline bg-grey-0 border-solid border border-grey-20 focus-within:border-violet-60 pointer p-base rounded mt-xsmall">
      <input
        type="radio"
        // extremely long classNames .. but we can extract this into global.css and make it a component
        className="appearance-none relative w-[20px] h-[20px] border-solid rounded-circle border border-grey-30 checked:border-violet-60 checked:border-2 after:bg-violet-60 after:w-[12px] after:h-[12px] after:rounded-circle after:m-auto after:inset-0 after:absolute after:invisible checked:after:visible"
      />
      <div className="ml-small">
        <div className="-mt-[2px]">{label}</div>
        <p className="inter-small-regular text-grey-50">{description}</p>
      </div>
    </div>
  )
}
