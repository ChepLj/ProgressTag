import { IonButton, IonButtons, IonChip, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonPopover, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";

import { useState } from "react";

export default function ProgressSelectModal({ isModalOpen, setIsModalOpen, setProgressTag }: { isModalOpen: boolean; setIsModalOpen: Function; setProgressTag: Function }) {
  const [searchText, setSearchText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [options, setOptions] = useState({
    PT_01: { id: "Option1", type: "Original", area: "none" },
    PT_02: { id: "Option2", type: "Original", area: "none" },
  });

  const [filteredOptions, setFilteredOptions] = useState<string[]>(Object.keys(options));
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setFilteredOptions(Object.keys(options).filter((key) => options[key].id.toLowerCase().includes(text.toLowerCase())));
    setErrorText("");
  };

  const handleSelectOption = (key: string) => {
    if (selectedOptions.includes(key)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== key));
    } else {
      setSelectedOptions([...selectedOptions, key]);
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

  const handleAddMissingValue = () => {
    const conditionCheck = () => {
      if (/\s/.test(searchText)) return { value: false, messenger: "Progress Tag không được có khoảng trắng ! " };
      if (searchText.length < 5 || searchText.length > 25) return { value: false, messenger: "Độ dài Progress Tag phải >4 và <25 ký tự ! " };
      for (const key in options) {
        if (options[key]?.id.toLocaleLowerCase() == searchText.toLocaleLowerCase()) {
          return { value: false, messenger: "Độ dài Progress Tag phải <3 và <25 ký tự ! " };
        }
      }
      return { value: true, messenger: "" };
    };
    if (conditionCheck().value) {
      const newKey = `New_${Date.now()}`;
      setOptions({ ...options, [newKey]: { id: searchText, type: "Original" } });
      setFilteredOptions([...filteredOptions, newKey]);
      setSelectedOptions([...selectedOptions, newKey]);
      setSearchText("");
    } else {
      setErrorText(conditionCheck().messenger);
    }
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
            Search or Add
          </IonLabel>
          <IonInput value={searchText} placeholder="Type to search..." onIonChange={(e) => handleSearch(e.detail.value!)} />
        </IonItem>

        {/* Add Missing Value */}
        <IonButton size="small" expand="block" color="primary" onClick={handleAddMissingValue} disabled={!searchText.trim()}>
          Add "{searchText}" to List
        </IonButton>
        <span style={{ color: "red", fontStyle: "italic", fontSize: "10px", padding: "0 20px" }}>{errorText}</span>
        {/* Selected Options Summary */}
        <div style={{ padding: "1rem", color: "green", borderBottom: "2px dashed gray" }}>
          <strong>Selected:</strong>{" "}
          {selectedOptions.length > 0
            ? selectedOptions.map((key, index) => {
                const { id, type, area } = options[key] || {};
                return (
                  <span key={index}>
                    <IonChip id={`hover-trigger-${key}`} color={options[key]?.type == "Original" ? "success" : "medium"}>
                      <IonLabel style={{ paddingRight: 5 }}>{options[key]?.id}</IonLabel>
                    </IonChip>
                    <IonPopover trigger={`hover-trigger-${key}`} onDidDismiss={() => ""}>
                      <div style={{ padding: "1rem" }}>
                        <p>
                          <i>Area:</i> {area}
                        </p>
                        <p>
                          <i>Type:</i> {type}
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
              <IonLabel color={selectedOptions.includes(key) ? "secondary" : ""} onClick={() => handleSelectOption(key)}>
                {options[key]?.id}
                <span style={{ color: "gray", fontStyle: "italic", fontSize: "10px", paddingLeft: "2px" }}>({options[key].area})</span>
              </IonLabel>
              <div>
                <IonSegment
                  value={options[key]?.type}
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
