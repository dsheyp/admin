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
              // <ReturnReasonsList
              //   return_reasons={showReasons}
              //   onEditClick={reason => {
              //     navigate(`/a/settings/return-reasons/${reason.id}`)
              //   }}
              // />
              showReasons.map(reason => (
                <RadioItem
                  title={reason.label}
                  value={reason.value}
                  description={reason.description}
                  className="mt-xsmall"
                />
              ))
            )}
            {/* <Flex width={1} mt={3} justifyContent="space-between">
          <Text mt={1}>
          {showReasons.length}{" "}
            {showReasons.length === 1 ? "reason" : "reasons"}
          </Text>
          <Flex alignItems="center">
            <Button
              mr={2}
              variant="primary"
              onClick={() => onPreviousClick()}
              disabled={currentPage === 0}
            >
            Previous
            </Button>
            <Button
              variant="primary"
              onClick={() => onNextClick()}
              disabled={currentPage === numberOfPages - 1}
              >
              Next
              </Button>
              </Flex>
            </Flex> */}
          </div>
        </BodyCard>
        <BodyCard title="Details" subtitle="WRONG_SIZE"></BodyCard>
      </TwoSplitPane>
    </div>
  )
}

export default ReturnReasons

const RadioItem = ({ title, subtilte, value, className }) => {
  return (
    <div className="smthg flex items-baseline bg-grey-0 border-solid border border-grey-20 focus-within:border-violet-60 pointer p-base rounded mt-xsmall">
      <input
        type="radio"
        className="relative w-[20px] h-[20px] border-solid rounded-circle border border-grey-30 checked:border-violet-60 checked:border-2 after:bg-violet-60 after:w-[12px] after:h-[12px] after:rounded-circle after:m-auto after:inset-0 after:absolute after:invisible checked:after:visible"
      />
      <div className="ml-small">
        <div className="-mt-[2px]">
          <span className="inter-base-semibold">Wrong Size</span>
          <span>(Value: WRONG_SIZE)</span>
        </div>
        <p className="inter-small-regular text-grey-50">
          Customer wishes to replace the item due to a wrong size.
        </p>
      </div>
    </div>
  )
}
