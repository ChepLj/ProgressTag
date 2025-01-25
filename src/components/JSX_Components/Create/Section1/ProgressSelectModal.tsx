import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPopover,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useContext, useEffect, useState } from "react";

import { imagesOutline } from "ionicons/icons";
import { ProgressTagContext } from "../../../../context/progressTagContext";

export default function ProgressSelectModal({
  isModalOpen,
  setIsModalOpen,
  setProgressTag,
  setShowImage,
  progressTag,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  progressTag: any;
  setProgressTag: Function;
  setShowImage: Function;
}) {
  const [searchText, setSearchText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [options, setOptions] = useState({});

  const { ProgressTag, disPatchProgressTag } = useContext<any>(ProgressTagContext);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(Object.keys(options));
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  //TODO: Lấy Progress Tag khi load Page lần đầu
  useEffect(() => {
    if (ProgressTag) {
      if (progressTag) {
        setFilteredOptions(Object.keys(ProgressTag));
        setSelectedOptions(progressTag.map((crr: any) => crr.key));
        const optionTemp = ProgressTag;
        progressTag.forEach((crr: any) => {
          optionTemp[crr.key].type = crr.type;
        });

        setOptions(optionTemp);
      } else {
        Object.values(ProgressTag).forEach((crr: any) => {
          ProgressTag[crr.key].type = "Original";
        });
        setOptions(ProgressTag);
        setFilteredOptions(Object.keys(ProgressTag));
      }
    } else {
      alert("Có lỗi khi tải Progress Tag !");
    }
  }, [ProgressTag]);

  //TODO_END:Lấy Progress Tag khi load Page lần đầu

  const handleSearch = (text: string) => {
    setSearchText(text);

    setFilteredOptions(Object.keys(options).filter((key) => options[key].tag.toLowerCase().includes(text.toLowerCase())));
    setErrorText("");
  };

  const handleSelectOption = (key: string) => {
    if (selectedOptions.includes(key)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== key));
    } else {
      setSelectedOptions([...selectedOptions, key]);
    }
    if (!options[key]?.type) {
      options[key].type = "Original";
    }
  };
  const handleTypeChange = (key: string, e: any) => {
    const newType = e.innerText;
    setOptions((prevOptions) => {
      prevOptions[key].type = newType;
      return prevOptions;
    });
    setSelectedOptions((pre) => [...pre]);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    setProgressTag(() => {
      return selectedOptions.map((key, index) => options[key]);
    });
  };
  return (
    <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Options</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={() => setIsModalOpen(false)}>Close</IonButton>
          </IonButtons>
          <IonButtons slot="end" color="primary">
            <IonButton onClick={handleConfirm} color="success">
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Search Input */}
        <IonItem>
          <IonLabel position="stacked" color="tertiary">
            Search
          </IonLabel>
          <IonInput value={searchText} placeholder="Type to search..." onIonChange={(e) => handleSearch(e.detail.value!)} />
        </IonItem>

        {/* <IonButton size="small" expand="block" color="primary" onClick={handleAddMissingValue} disabled={!searchText.trim()}>
          Add "{searchText}" to List
        </IonButton> */}

        <span style={{ color: "red", fontStyle: "italic", fontSize: "10px", padding: "0 20px" }}>{errorText}</span>
        {/* Selected Options Summary */}
        <div style={{ padding: "1rem", color: "green", borderBottom: "2px dashed gray" }}>
          <strong>Selected:</strong>{" "}
          {selectedOptions.length > 0
            ? selectedOptions.map((key, index) => {
                // const { id, type, area } = options[key] || {};
                const { tag, type, area, local, images } = ProgressTag[key] || {};

                return (
                  <span key={index}>
                    <IonChip id={`create_hover-trigger-${key}`} color={options[key]?.type == "Original" ? "success" : "medium"}>
                      <IonLabel style={{ paddingRight: 5 }}>{options[key]?.tag}</IonLabel>
                    </IonChip>
                    <IonPopover trigger={`create_hover-trigger-${key}`} onDidDismiss={() => ""}>
                      <div style={{ padding: "1rem" }}>
                        <p>
                          <i>Area:</i> {area}
                        </p>
                        <p>
                          <i>Local:</i> {local}
                        </p>
                        <p>
                          <i>Type:</i> {type}
                        </p>
                        <p style={{ display: "flex", alignItems: "center" }}>
                          <i>View image</i>
                          <i>&nbsp;&nbsp;&nbsp;({images.length})&nbsp;</i>
                          <IonIcon
                            icon={imagesOutline}
                            color="primary"
                            onClick={() => {
                              images.length && setShowImage({ isOpen: true, index: 0, title: `ProgressTag ${tag}`, images: images.images });
                            }}
                          />
                        </p>
                        {/* Add more details as needed */}
                      </div>
                    </IonPopover>
                  </span>
                );
              })
            : "None"}
        </div>
        {/* Filtered List */}
        <IonList>
          {filteredOptions.map((key, index) => (
            <IonItem key={index}>
              <IonLabel
                style={{ cursor: "pointer" }}
                color={selectedOptions.includes(key) ? "secondary" : ""}
                onClick={() => handleSelectOption(key)}
              >
                {options[key]?.tag}
                <span style={{ color: "gray", fontStyle: "italic", fontSize: "10px", paddingLeft: "2px" }}>
                  ({options[key]?.area}/{options[key]?.local})
                </span>
              </IonLabel>

              <div>
                <IonSegment
                  value={options[key]?.type || "Original"}
                  onClick={(e) => {
                    const newValue = e.target;
                    handleTypeChange(key, newValue!); // Update type
                  }}
                >
                  <IonSegmentButton value="Original">
                    <IonLabel>Original</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="Temporary">
                    <IonLabel>Temporary</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </div>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
}
